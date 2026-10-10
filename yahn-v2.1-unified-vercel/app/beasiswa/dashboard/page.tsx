import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import ScholarshipDashboardClient from './ScholarshipDashboardClient';
export const dynamic='force-dynamic';
export default function ScholarshipDashboard(){return <><SiteHeader/><main><ScholarshipDashboardClient/></main><SiteFooter/></>}
