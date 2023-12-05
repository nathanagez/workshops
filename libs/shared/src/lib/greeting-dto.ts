export interface GreetingDto {
  id: string;
  label: string;
}

export interface GreetingsResponseDto {
  items: GreetingDto[];
}
