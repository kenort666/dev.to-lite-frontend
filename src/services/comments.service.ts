import { AxiosResponse } from 'axios';
import { IComments, IPost } from '../@types';
import $api from '../api';

export class CommentService {
  static async postComment(
    pageId: string,
    user: string,
    CommentText: string
  ): Promise<AxiosResponse<IPost>> {
    return await $api.put<IPost>(`/comment/${pageId}`, { CommentText, user });
  }

  static async getFirstComments(): Promise<AxiosResponse<IComments[]>> {
    return await $api.get<IComments[]>('/comments');
  }

  static async deleteComment(commentId: string) {
    return await $api.patch('/comment', { commentId });
  }
}
