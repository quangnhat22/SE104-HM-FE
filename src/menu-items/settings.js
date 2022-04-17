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
                    title: 'Cài đặt loại phòng',
                    type: 'item',
                    url: '/room-settings',
                    target: false,
                    breadcrumbs: false
                },
            ]
        }
    ]
};

export default settings;
