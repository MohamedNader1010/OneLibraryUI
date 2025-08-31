import { ITokensDTO } from './tokens-dto.interface';

export interface IAuthResponseDTO {
    tokens: ITokensDTO;
    username: string;
    id: string;
}
