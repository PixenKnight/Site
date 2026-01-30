import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/personal')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div className="min-h-[calc(100vh-72px-68px)] bg-gray-950 via-slate-800 to-slate-900">
			Hello "/personal"!
		</div>
)
}
