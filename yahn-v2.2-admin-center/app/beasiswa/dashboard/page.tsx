import { PortalHeader } from '@/components/PortalHeader';
import { PortalFooter } from '@/components/PortalFooter';
import ScholarshipDashboardClient from './ScholarshipDashboardClient';
export const dynamic='force-dynamic';
export default function ScholarshipDashboard(){return <><PortalHeader mode="student" /><main><ScholarshipDashboardClient/></main><PortalFooter mode="student" /></>}
