import { IServiceResponse } from 'app/interfaces/common/IServiceResponse';
import { EndPoints, GitHubEndpoints } from './http';
import httpClient from './http/httpClient';
import { AxiosResponse } from 'axios';
// import { GitHubEndpoints } from './http/endPoints';
import { IGitSearch } from 'app/interfaces/git/IGitSearch';
/**
 * @name SearchRepos
 * @description `Search Repository by search criteria`
 */
export const SearchRepos = (query: string, page_number: number, per_page: number, sort: string, order: string) => {
    return new Promise<IGitSearch>((resolve, reject) => {
        const params={
            q: query, 
            page_number:page_number,
            sort: sort,
            order:order,
            per_page:per_page
        }
        httpClient
            .get(`${EndPoints.GitHub}${GitHubEndpoints.searchRepos}`, { params })
            .then((res: AxiosResponse) => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            });
    });
};

