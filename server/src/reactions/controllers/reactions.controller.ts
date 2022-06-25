import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Request, UseGuards} from '@nestjs/common';
import { ReactionsService } from '../services/reactions.service';
import { NewReactionDto } from '../dto/new-reaction.dto';
import { CreateReactionDto } from '../dto/create-reaction.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('reactions')
export class ReactionsController {
    constructor(private reactionsService: ReactionsService) {
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    newReaction(@Body() newReactionDto: NewReactionDto, @Request() req) {
        const { postId, ...createReactionDto } = newReactionDto;
        return this.reactionsService.newReaction(createReactionDto, postId, req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('id/:reactionId')
    removeReaction(@Param('reactionId', ParseIntPipe) reactionId, @Request() req) {
        return this.reactionsService.removeReactionById(reactionId, req.user.id)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('all')
    removeAllReactions(@Request() req) {
        return this.reactionsService.removeAllUserReactions(req.user.id)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('from/post/:postId')
    removeAllReactionsFromPost(@Param('postId', ParseIntPipe) postId, @Request() req) {
        return this.reactionsService.removeAllUserReactionsFromPost(req.user.id, postId)
    }
}
