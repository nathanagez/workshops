export interface GreetingsDto {
  id: string;
  label: string;
}

export interface GreetingsResponseDto {
  items: GreetingsDto[];
}
