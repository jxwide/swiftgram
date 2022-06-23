import { Controller, Get, Param, ParseIntPipe, Request, UseGuards } from '@nestjs/common';
import { SubsService } from '../services/subs.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('subs')
export class SubsController {
    constructor(private subsService: SubsService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get('new/:targetId')
    makeSubscribe(@Param('targetId', ParseIntPipe) targetId, @Request() req) {
        return this.subsService.newSubscription(req.user.id, targetId);
    }
}
