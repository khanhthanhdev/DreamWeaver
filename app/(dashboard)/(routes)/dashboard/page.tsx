import { UserButton } from "@clerk/nextjs/app-beta"

const DashboardPage = () => {
  return (
    <div>
      <p>Daschboard Page</p>
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}

export default DashboardPage
