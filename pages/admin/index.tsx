import { AdminLayout } from '@/components/layouts';
import { DashboardOutlined } from '@mui/icons-material';
import { NextPage } from 'next';



interface Props {
}

const AdminDashboard: NextPage<Props> = ({}) => {
   return (
        <AdminLayout
            title={'Admin Dashboard'}
            subtitle={'General Stats'}
            icon={<DashboardOutlined/>}
        >
            <h1>Admin Dashboard</h1>
        </AdminLayout>
    )
}

export default AdminDashboard;