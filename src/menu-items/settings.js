// assets
import { IconSettings } from '@tabler/icons';

const settings = {
    id: 'settingsGroup',
    title: 'Cài đặt',
    type: 'group',

    children: [
        {
            id: 'settings',
            title: 'Cài đặt',
            type: 'collapse',
            icon: IconSettings,

            children: [
                {
                    id: 'roomSettings',
                    title: 'Cài đặt phòng',
                    type: 'item',
                    url: '/room-settings',
                    target: false,
                    breadcrumbs: false
                },
                {
                    id: 'customerSettings',
                    title: 'Cài đặt loại khách hàng',
                    type: 'item',
                    url: '/customer-settings',
                    target: false,
                    breadcrumbs: false
                },
                {
                    id: 'surchargeRateSettings',
                    title: 'Cài đặt tỷ lệ phụ thu',
                    type: 'item',
                    url: '/surcharge-rate-settings',
                    target: false,
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default settings;
