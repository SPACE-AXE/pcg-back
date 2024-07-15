export class TokenDto {
  constructor({
    username,
    id,
    nickname,
  }: {
    username: string;
    id: number;
    nickname: string;
  }) {
    this.username = username;
    this.id = id;
    this.nickname = nickname;
  }

  username: string;
  id: number;
  nickname: string;
}
