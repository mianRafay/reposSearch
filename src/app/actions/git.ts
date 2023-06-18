import { AppDispatch } from 'app/interfaces/web/Store';
import { IGitSearch } from 'app/interfaces/git/IGitSearch';
import { IServiceResponse } from 'app/interfaces/common/IServiceResponse';
import { SearchRepos } from 'app/services';
import { GitTypes } from 'app/constants/action-types';

export const searchRepositories: any = (query: string, page_number: number,per_page:number,  sort: string, order: string)=> (dispatch: AppDispatch) => {
    return new Promise<unknown>((resolve, reject) => {
        SearchRepos(query, page_number,per_page, sort, order)
            .then((res: IGitSearch) => {
                    dispatch({
                        type: GitTypes.SEARCH_REPOS,
                        payload: res?? {},
                    });
                    resolve(res);
            })
            .catch((error: IServiceResponse<string>) => {
                reject(error);
            });
    });
};
