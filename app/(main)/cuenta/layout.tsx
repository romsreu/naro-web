import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import AccountSidebar from '@/components/layout/AccountSidebar/AccountSidebar'
import { decodeToken } from '@/lib/auth/token'
import styles from './layout.module.css'

export default async function CuentaLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value

  if (!accessToken) redirect('/login')

  const nombre = decodeToken(accessToken).nombre ?? 'Usuario'

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.sidebarWrap}>
          <AccountSidebar nombre={nombre} />
        </div>
        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  )
}
