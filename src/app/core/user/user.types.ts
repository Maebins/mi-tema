
export interface UserPagination {
    items: User[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

export interface User {
    id: string;
    userId: string;
    fullName: string;
    userName: string;
    password: any;
    email: string;
}
