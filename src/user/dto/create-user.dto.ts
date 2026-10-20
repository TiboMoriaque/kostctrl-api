import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength} from "class-validator"

export class CreateUserDto {
    @IsEmail({}, {message: "Format d'email invalide"})
    @IsOptional()
    email: string
    @IsNotEmpty({message: "Le prénom est requis"})
    @IsString({message: "Le prénom doit être une chaine de caractère"})
    @MinLength(3, {message: "Le prénom doit faire au moins 3 caractères"})
    firstName: string
    @IsNotEmpty({message: "Le nom est requis"})
    @IsString({message: "Le nom doit être une chaine de caractère"})
    @MinLength(3, {message: "Le nom doit faire au moins 3 caractères"})
    lastName: string
    @IsNotEmpty({message: "Le téléphone est requis"})
    phone: string
    @IsNotEmpty({message: "La ville de résidence est requis"})
    location: string
    @IsNotEmpty({message: "Le nom est requis"})
    @MinLength(8, {message: "Le mot de passe doit faire au moins 8 caractères"})
    password: string
}
