export interface CreateUserDto {
  id: string;

  email: string;

  password: string;

  firstName?: string;

  lastName?: string;
}

export default CreateUserDto;
