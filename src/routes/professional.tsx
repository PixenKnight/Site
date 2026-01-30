import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/professional')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/professional"!</div>
}
