import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { Video } from 'src/videos/entities/video.entity';
import { User } from 'src/users/entities/user.entity';


@Injectable()
export class NotificationsService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async sendNotificationToUsers(users: User[], video: Video) {
    for (const user of users) {
      if (user.fcmToken) {
        await this.firebaseService.sendPush(user.fcmToken, {
          title: 'Yangi video qo‘shildi!',
          body: video.title,
          data: {
            videoId: video.id.toString(),
          },
        });
      }
    }
  }
}
