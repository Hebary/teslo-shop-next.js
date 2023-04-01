import { SummaryTile } from '@/components/admin';
import { AdminLayout } from '@/components/layouts';
import {  AccessTimeOutlined, AttachMoneyOutlined, CancelPresentationOutlined, CategoryOutlined, CreditCardOffOutlined, DashboardOutlined, GroupOutlined, ProductionQuantityLimitsOutlined } from '@mui/icons-material';
import { Card, CardContent, Grid, Typography } from '@mui/material';
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
            <Grid container spacing={2}>
            
                <SummaryTile
                    title={ 3 }
                    subtitle={'Total Orders'}
                    icon={<CreditCardOffOutlined color='secondary' sx={{ fontSize: 45 }}/>}
                />
                <SummaryTile
                    title={ 2 }
                    subtitle={'Paid Orders'}
                    icon={<AttachMoneyOutlined color='success' sx={{ fontSize: 45 }}/>}
                />
                <SummaryTile
                    title={ 1 }
                    subtitle={'Pending Orders'}
                    icon={<CreditCardOffOutlined color='warning' sx={{ fontSize: 45 }}/>}
                />
                <SummaryTile
                    title={ 4 }
                    subtitle={'Clients'}
                    icon={<GroupOutlined color='primary' sx={{ fontSize: 45 }}/>}
                />
                <SummaryTile
                    title={ 5 }
                    subtitle={'Products'}
                    icon={<CategoryOutlined color='primary' sx={{ fontSize: 45 }}/>}
                />
                <SummaryTile
                    title={ 6 }
                    subtitle={'Out of stock'}
                    icon={<CancelPresentationOutlined color='error' sx={{ fontSize: 45 }}/>}
                />
                <SummaryTile
                    title={ 7 }
                    subtitle={'Low inventary'}
                    icon={<ProductionQuantityLimitsOutlined color='warning' sx={{ fontSize: 45 }}/>}
                />
                <SummaryTile
                    title={ 8 }
                    subtitle={'Update inventary in: 2 days'}
                    icon={<AccessTimeOutlined color='secondary' sx={{ fontSize: 45 }}/>}
                />
            </Grid>
        </AdminLayout>
    )
}

export default AdminDashboard;