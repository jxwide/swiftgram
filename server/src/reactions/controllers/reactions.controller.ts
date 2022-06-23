import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ReactionsService } from '../services/reactions.service';

@Controller('reactions')
export class ReactionsController {
    constructor(private reactionsService: ReactionsService) {
    }

    @Get('/:rtype/:userid/:postid')
    newReaction(@Param('rtype') rtype, @Param('userid', ParseIntPipe) userid, @Param('postid', ParseIntPipe) postid) {
        return this.reactionsService.newReaction(rtype, postid, userid)
    }
}
