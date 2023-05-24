import { act } from "react-dom/test-utils";

import { User } from "../../types/User";
import productsReducer from "./productReducer";
import axios, { AxiosError } from "axios";
import { UserCredential } from "../../types/UserCredential";

interface UserReducer {
    users: User[]
    currentUser?: User
    loading: boolean
    error: string
}