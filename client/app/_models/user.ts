import { ficheDeFrais } from './ficheDeFrais'

﻿export class User {
    _id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
		fichesDeFrais: Array<ficheDeFrais>;
}
