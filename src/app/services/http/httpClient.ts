import axios from 'axios';
import $ from 'jquery';
import store from 'app/store';
import { ThemeTypes } from 'app/constants/action-types';

export const authToken = 'Kz1c1tWYDDfWqjAI18Kn3bLRQugUXLB7yU4Qxopp';
export class HttpClient {
    public requestsCount;
    public onRequestInit;
    public onRequestCompleted;
    private url;
    private req;

    constructor() {
        this.requestsCount = 0;
        this.url = '/';
        this.req = '';
    }

    getUrl = () => {
        return this.url;
    };

    requestInit = (config: any, displayLoader: boolean = true) => {
        if (displayLoader) {
            this.requestsCount++;
        }

        if (this.onRequestInit) {
            if (displayLoader) {
                this.onRequestInit(config, this.requestsCount);
            } else {
                addAuthHeader(config, this.url);
            }
        }
    };
    requestCompleted = (response: any, error: any) => {
        if (error) {
            console.log(`api request ${this.req} to endpoint ${this.url} failed`);
            store.dispatch({
                type: ThemeTypes.TOGGLE_SNACKBAR,
                payload: { show: true, message: response?.data?.message ?? error.message, type: 'error' },
            });
        } else {
            if (response.status != 200 && (response.status !== 0)) {
                let msg = `api request ${this.req} to endpoint ${this.url} failed with message`;
                let show = true;

                store.dispatch({
                    type: ThemeTypes.TOGGLE_SNACKBAR,
                    payload: { show, msg, type: 'error' },
                });
            }
        }

        if (this.requestsCount > 0) {
            this.requestsCount--;
        }

        if (this.onRequestCompleted) {
            this.onRequestCompleted(response, this.requestsCount);
        }
    };

    get = (url: string, config?: any) => {
        this.url = url;
        this.req = 'GET';
        config = this.setConfigObj(config);
        this.requestInit(config);
        let promise = axios.get(url, config);

        promise
            .then(res => {
                this.requestCompleted(res, null);
            })
            .catch(err => {
                this.requestCompleted({}, err);
            });

        return promise;
    };

    getReqWithNoLoader = (url: string, config?: any) => {
        this.url = url;
        this.req = 'GET';
        config = this.setConfigObj(config);
        this.requestInit(config, false);

        return axios.get(url, config);
    };

    post = (url: string, data: any, config?: any, displayLoader?: any) => {
        this.url = url;
        this.req = 'POST';
        config = this.setConfigObj(config);
        this.requestInit(config, displayLoader);
        let promise = axios.post( url, data, config);

        promise
            .then(res => {
                this.requestCompleted(res, null);
            })
            .catch(err => {
                console.log('err', err);

                this.requestCompleted({}, err);
            });

        return promise;
    };

    postReqWithNoLoader = (url: string, data: any, config?: any) => {
        this.url = url;
        this.req = 'POST';
        config = this.setConfigObj(config);
        this.requestInit(config, false);

        return axios.post( url, data, config);
    };

    delete = (url: string, config?: any) => {
        this.url = url;
        this.req = 'DELETE';
        config = this.setConfigObj(config);
        this.requestInit(config);
        let promise = axios.delete( url, config);

        promise
            .then(res => {
                this.requestCompleted(res, null);
            })
            .catch(err => {
                this.requestCompleted({}, err);
            });

        return promise;
    };

    setConfigObj = (config: any) => {
        if (config == undefined || config == null) {
            config = {};
        }

        return config;
    };
}

const ourHttpClient = new HttpClient();

const addAuthHeader = (config: any, url: string) => {
    if (authToken) {
        if (config == undefined || config == null) {
            config = { headers: {} };
        }

        if (config.headers == undefined || config.headers == null) {
            config.headers = {};
        }

        // config.headers['x-access-token'] = authToken;
        config.headers['Content-Type'] = 'application/json';
    }

    return config;
};

ourHttpClient.onRequestInit = (config: any, requestCount: number) => {
    addAuthHeader(config, ourHttpClient.getUrl());
    if (requestCount > 0) {
        $('#root').css('pointer-events', 'none');
        $('#main-loader').css('display', '');
    }
};

ourHttpClient.onRequestCompleted = (response: any, requestCount: number) => {
    if (requestCount === 0) {
        $('#main-loader').css('display', 'none');
        $('#root').css('pointer-events', '');
    }
};

export default ourHttpClient;
