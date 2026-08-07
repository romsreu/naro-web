import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import AccountSidebar from '@/components/layout/AccountSidebar/AccountSidebar'
import styles from './layout.module.css'

function getNombreFromToken(token: string): string | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.nombre ?? null
  } catch {
    return null
  }
}

export default async function CuentaLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value

  if (!accessToken) redirect('/login')

  const nombre = getNombreFromToken(accessToken) ?? 'Usuario'

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
