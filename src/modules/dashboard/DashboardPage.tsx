export function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Ana Sayfa</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Toplam Rezervasyon', value: '124', color: 'bg-blue-500' },
          { label: 'Bugünkü Transferler', value: '18', color: 'bg-green-500' },
          { label: 'Bekleyen Ödemeler', value: '₺12.450', color: 'bg-yellow-500' },
          { label: 'Aktif Araçlar', value: '8', color: 'bg-purple-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <div className={`mt-3 h-1 w-12 rounded-full ${stat.color}`} />
          </div>
        ))}
      </div>
    </div>
  )
}
