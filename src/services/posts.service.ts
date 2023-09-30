import { AxiosResponse } from 'axios';
import { IComments, ICreatePost, IPost, ITags } from '../@types';
import $api from '../api';

export class PostsService {
  static async fetchPosts(): Promise<AxiosResponse<IPost[]>> {
    return await $api.get<IPost[]>('/posts');
  }

  static async fetchOnePost(id: string): Promise<AxiosResponse<IPost>> {
    return await $api.get<IPost>(`/posts/${id}`);
  }

  static async createPost(params: ICreatePost): Promise<AxiosResponse<IPost>> {
    return await $api.post<IPost>('/createPosts', params);
  }

  static async deletePost(id: string) {
    await $api.delete(`/posts/${id}`);
  }

  static async updatePost(id: string, fields: ICreatePost) {
    return await $api.patch(`/posts/${id}`, fields);
  }

  static async fetchTagsFromPosts(): Promise<AxiosResponse<ITags[]>> {
    return await $api.get<ITags[]>(`/tags`);
  }

  static async findPostsByTags(name: string): Promise<AxiosResponse<IPost[]>> {
    return await $api.get<IPost[]>(`/tags/${name}`);
  }
}
