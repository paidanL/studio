
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Example Cards - Replace with actual data and components */}
        <Card>
          <CardHeader>
            <CardTitle>Total Income</CardTitle>
            <CardDescription>Year-to-Date</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">$50,000</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Expenses</CardTitle>
            <CardDescription>Year-to-Date</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">$30,000</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Net Cash Flow</CardTitle>
            <CardDescription>This Year</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">$20,000</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Assets</CardTitle>
            <CardDescription>Total Value</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">$150,000</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Liabilities</CardTitle>
            <CardDescription>Total Owed</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">$50,000</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Net Worth</CardTitle>
            <CardDescription>Assets - Liabilities</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">$100,000</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
