interface StatCardProps {
  number: number
  label: string
  icon: string
}

export default function StatCard({ number, label, icon }: StatCardProps) {
  return (
    <div className="text-center">
      <div className="text-4xl mb-2">{icon}</div>
      <div className="text-3xl font-bold text-jungle-600 mb-1">
        {number.toLocaleString()}
      </div>
      <div className="text-sm text-gray-600 font-medium">
        {label}
      </div>
    </div>
  )
}