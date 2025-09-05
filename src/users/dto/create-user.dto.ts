import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Max, Min } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ example : "Ali" })
    @IsString()
    @IsNotEmpty()
    @Max(18)
    @Min(2)
    name : string

    @ApiProperty({ example : "ali73@gmail.com"})
    @IsString()
    @IsNotEmpty()
    email : string
    
    @ApiProperty({ example : "ali8234"})
    @IsString()
    @IsNotEmpty()
    password : string
}
