import { inject, Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { LocalStorageKeys } from '../../shared/constants/local-storage-keys.constants';
import { TableCommunicationService } from '../../shared/services/table-communication.service';
import { SignalRHubsConstants } from '../constants/signalR-hubs.constants';
import { SignalRMethodsConstants } from '../constants/signalR-methods.constants';
import { IOrderDTO } from '../models/Orders/dtos/order-dto.interface';

@Injectable({
    providedIn: 'root'
})
export class SignalRService {
    toastrService = inject(ToastrService);
    tableCommunicationService = inject(TableCommunicationService);
    #token = localStorage.getItem(LocalStorageKeys.TOKEN);

    #orderHubConnection: signalR.HubConnection = new signalR.HubConnectionBuilder()
        .withUrl(`${environment.host}${SignalRHubsConstants.OrderHub}`)
        .withAutomaticReconnect()
        .build();

    #options: signalR.IHttpConnectionOptions = {
        accessTokenFactory: () => {
            if (!this.#token) {
                console.error('No token found');
                throw new Error('No token found');
            }
            return this.#token;
        }
    };

    #notificationHubConnection: signalR.HubConnection = new signalR.HubConnectionBuilder()
        .withUrl(`${environment.host}${SignalRHubsConstants.NotificationsHub}?access_token=${this.#token}`, this.#options)
        .withAutomaticReconnect()
        .build();

    #startConnection(connection: signalR.HubConnection) {
        connection
            .start()
            .then(() => console.log(`connected to ${connection} hub`))
            .catch(() => console.log(`error connecting to ${connection} hub`));

        connection.onreconnecting(() => {
            console.log(`reconnecting to ${connection} hub`);
            this.toastrService.warning('جاري إعادة الاتصال', 'إعادة الاتصال');
        });

        connection.onreconnected(() => {
            console.log(`reconnected to ${connection} hub`);
            this.toastrService.success('تم إعادة الاتصال بنجاح', 'إعادة الاتصال');
        });
    }

    #stopConnection(connection: signalR.HubConnection) {
        connection
            .stop()
            .then(() => console.log(`disconnected from ${connection.baseUrl.replace(environment.host, '')} hub`))
            .catch(() => console.log(`error disconnecting from ${connection.baseUrl.replace(environment.host, '')} hub`));
    }

    connectToOrderHub = () => {
        this.#startConnection(this.#orderHubConnection);
        this.handleOrderCreated();
    };

    handleOrderCreated = () => {
        this.#orderHubConnection.on(SignalRMethodsConstants.ORDER_Created, (order: IOrderDTO) => {
            this.toastrService.success(`تم تسجيل طلب جديد بواسطة ${order.createdBy}`);
            this.tableCommunicationService.reload();
        });
    };

    disconnectToOrderHub = () => this.#stopConnection(this.#orderHubConnection);

    connectToNotificationHub = () => this.#startConnection(this.#notificationHubConnection);

    disconnectFromNotificationHub = () => this.#stopConnection(this.#notificationHubConnection);
}
