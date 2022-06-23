import { Body, Controller, Get, Param, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import { ReactionsService } from '../services/reactions.service';
import { NewReactionDto } from '../dto/new-reaction.dto';
import { CreateReactionDto } from '../dto/create-reaction.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('reactions')
export class ReactionsController {
    constructor(private reactionsService: ReactionsService) {
    }

    @UseGuards(JwtAuthGuard)
    @Post('new')
    newReaction(@Body() newReactionDto: NewReactionDto, @Request() req) {
        const { postId, ...createReactionDto } = newReactionDto;
        return this.reactionsService.newReaction(createReactionDto, postId, req.user.id);
    }
}
