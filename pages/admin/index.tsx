import { NextPage } from 'next';
import { Grid  } from '@mui/material';
import { AccessTimeOutlined, AttachMoneyOutlined, CancelPresentationOutlined, CategoryOutlined, CreditCardOffOutlined, DashboardOutlined, GroupOutlined, ProductionQuantityLimitsOutlined } from '@mui/icons-material';
import useSWR from 'swr';

import { AdminLayout } from '@/components/layouts';
import { SummaryTile } from '@/components/admin';
import { DashboardResponse } from '@/interfaces';
import { FullScreenLoading } from '@/components/ui';





const AdminDashboard: NextPage = () => {

    const {data, error} = useSWR<DashboardResponse>('/api/admin/dashboard', {
        refreshInterval: 30*1000
    });
    
    if(!error && !data) return <FullScreenLoading/>
    if(error) return <p>Something went wrong</p>

    const { 
        orders,
        paidOrders,
        notPaidOrders,
        numberOfClients,
        numberOfProducts,
        productsOutOfStock,
        lowInventory
    } = data!;

   return (
        <AdminLayout
            title={'Admin Dashboard'}
            subtitle={'General Stats'}
            icon={<DashboardOutlined/>}
        >
            <Grid container spacing={2}>
            
                <SummaryTile
                    title={ orders }
                    subtitle={'Total Orders'}
                    icon={<CreditCardOffOutlined color='secondary' sx={{ fontSize: 45 }}/>}
                />
                <SummaryTile
                    title={ paidOrders }
                    subtitle={'Paid Orders'}
                    icon={<AttachMoneyOutlined color='success' sx={{ fontSize: 45 }}/>}
                />
                <SummaryTile
                    title={ notPaidOrders }
                    subtitle={'Pending Orders'}
                    icon={<CreditCardOffOutlined color='warning' sx={{ fontSize: 45 }}/>}
                />
                <SummaryTile
                    title={ numberOfClients }
                    subtitle={'Clients'}
                    icon={<GroupOutlined color='primary' sx={{ fontSize: 45 }}/>}
                />
                <SummaryTile
                    title={ numberOfProducts }
                    subtitle={'Products'}
                    icon={<CategoryOutlined color='primary' sx={{ fontSize: 45 }}/>}
                />
                <SummaryTile
                    title={ productsOutOfStock }
                    subtitle={'Out of stock'}
                    icon={<CancelPresentationOutlined color='error' sx={{ fontSize: 45 }}/>}
                />
                <SummaryTile
                    title={ lowInventory }
                    subtitle={'Low inventary'}
                    icon={<ProductionQuantityLimitsOutlined color='warning' sx={{ fontSize: 45 }}/>}
                />
                <SummaryTile
                    title={ 11 }
                    subtitle={'Update inventary in: 2 days'}
                    icon={<AccessTimeOutlined color='secondary' sx={{ fontSize: 45 }}/>}
                />
            </Grid>
        </AdminLayout>
    )
}

export default AdminDashboard;