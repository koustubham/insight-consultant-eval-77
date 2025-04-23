
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

// Mock analytics data
const mockAssessmentCompletionData = [
  { month: 'Jan', completed: 12, pending: 5 },
  { month: 'Feb', completed: 18, pending: 7 },
  { month: 'Mar', completed: 24, pending: 9 },
  { month: 'Apr', completed: 32, pending: 11 },
  { month: 'May', completed: 28, pending: 8 },
  { month: 'Jun', completed: 35, pending: 10 },
];

const mockPerformanceData = [
  { skill: 'JavaScript', averageScore: 85 },
  { skill: 'React', averageScore: 78 },
  { skill: 'Node.js', averageScore: 72 },
  { skill: 'Python', averageScore: 81 },
  { skill: 'AWS', averageScore: 65 },
  { skill: 'SQL', averageScore: 76 },
];

const mockPassRateData = [
  { name: 'Passed', value: 78 },
  { name: 'Failed', value: 22 },
];

const mockJobDescriptionAnalytics = [
  { job: 'Full Stack Developer', assessmentCount: 45, averageScore: 82, passRate: 84 },
  { job: 'Data Scientist', assessmentCount: 32, averageScore: 79, passRate: 78 },
  { job: 'DevOps Engineer', assessmentCount: 28, averageScore: 75, passRate: 71 },
  { job: 'React Frontend', assessmentCount: 38, averageScore: 83, passRate: 87 },
  { job: 'Project Manager', assessmentCount: 22, averageScore: 80, passRate: 82 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
const PASS_COLORS = ['#4CAF50', '#FF5722'];

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = React.useState('6m');
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-assessment-blue">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Assessment performance metrics and insights</p>
        </div>
        <Select
          value={timeRange}
          onValueChange={setTimeRange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1m">Last Month</SelectItem>
            <SelectItem value="3m">Last 3 Months</SelectItem>
            <SelectItem value="6m">Last 6 Months</SelectItem>
            <SelectItem value="1y">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assessment Completion Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Assessment Completion Trend</CardTitle>
            <CardDescription>Monthly completion and pending rates</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mockAssessmentCompletionData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" name="Completed" stackId="a" fill="#4CAF50" />
                <Bar dataKey="pending" name="Pending" stackId="a" fill="#FFA726" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Skill Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Skill Performance</CardTitle>
            <CardDescription>Average scores by skill category</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={mockPerformanceData}
                margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="skill" type="category" />
                <Tooltip />
                <Bar 
                  dataKey="averageScore" 
                  name="Average Score" 
                  fill="#3E92CC"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Pass Rate */}
        <Card>
          <CardHeader>
            <CardTitle>Overall Pass Rate</CardTitle>
            <CardDescription>Assessment success ratio</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <div className="flex justify-center items-center h-full">
              <div className="w-64">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={mockPassRateData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {mockPassRateData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PASS_COLORS[index % PASS_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Job Description Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>Job Description Performance</CardTitle>
            <CardDescription>Assessment metrics by job description</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={mockJobDescriptionAnalytics}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="job" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="averageScore" 
                  name="Avg. Score" 
                  stroke="#3E92CC" 
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="passRate" 
                  name="Pass Rate %" 
                  stroke="#4CAF50" 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Job Description Table */}
      <Card>
        <CardHeader>
          <CardTitle>Job Description Analytics</CardTitle>
          <CardDescription>Detailed metrics by job description</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Job Description</th>
                  <th className="text-center py-3 px-4">Assessments</th>
                  <th className="text-center py-3 px-4">Avg. Score</th>
                  <th className="text-center py-3 px-4">Pass Rate</th>
                </tr>
              </thead>
              <tbody>
                {mockJobDescriptionAnalytics.map((job, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{job.job}</td>
                    <td className="py-3 px-4 text-center">{job.assessmentCount}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex items-center">
                        <span
                          className={`w-3 h-3 rounded-full mr-2 ${
                            job.averageScore >= 80 ? 'bg-green-500' :
                            job.averageScore >= 70 ? 'bg-blue-500' :
                            'bg-yellow-500'
                          }`}
                        />
                        {job.averageScore}%
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex items-center">
                        <span
                          className={`w-3 h-3 rounded-full mr-2 ${
                            job.passRate >= 80 ? 'bg-green-500' :
                            job.passRate >= 70 ? 'bg-blue-500' :
                            'bg-yellow-500'
                          }`}
                        />
                        {job.passRate}%
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
