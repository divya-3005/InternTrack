import { useState, useEffect } from 'react';
import api from '../api';
import Navbar from '../components/Navbar';
import JobCard from '../components/JobCard';
import JobForm from '../components/JobForm';
import { Plus, Search, Filter } from 'lucide-react';

const Dashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingJob, setEditingJob] = useState(null);
    const [filter, setFilter] = useState('ALL');
    const [search, setSearch] = useState('');

    const fetchJobs = async () => {
        try {
            const { data } = await api.get('/jobs');
            setJobs(data);
        } catch (error) {
            console.error('Failed to fetch jobs', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleCreate = async (jobData) => {
        try {
            const { data } = await api.post('/jobs', jobData);
            setJobs([data, ...jobs]);
            setShowForm(false);
        } catch (error) {
            console.error('Failed to create job', error);
        }
    };

    const handleUpdate = async (jobData) => {
        try {
            const { data } = await api.put(`/jobs/${editingJob.id}`, jobData);
            setJobs(jobs.map(j => j.id === editingJob.id ? data : j));
            setShowForm(false);
            setEditingJob(null);
        } catch (error) {
            console.error('Failed to update job', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this application?')) {
            try {
                await api.delete(`/jobs/${id}`);
                setJobs(jobs.filter(j => j.id !== id));
            } catch (error) {
                console.error('Failed to delete job', error);
            }
        }
    };

    const openEdit = (job) => {
        setEditingJob(job);
        setShowForm(true);
    };

    const filteredJobs = jobs.filter(job => {
        const matchesFilter = filter === 'ALL' || job.status === filter;
        const matchesSearch = job.company.toLowerCase().includes(search.toLowerCase()) ||
            job.position.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const stats = {
        total: jobs.length,
        interviewing: jobs.filter(j => j.status === 'INTERVIEWING').length,
        offers: jobs.filter(j => j.status === 'OFFER').length
    };

    return (
        <div style={{ minHeight: '100vh', paddingBottom: '40px' }}>
            <Navbar />

            <div className="container" style={{ marginTop: '40px' }}>
                {/* Stats Row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                    <div className="card" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(99, 102, 241, 0.05))', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                        <h3 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '8px' }}>Total Applications</h3>
                        <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>{stats.total}</p>
                    </div>
                    <div className="card" style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.05))', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                        <h3 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '8px' }}>Interviews</h3>
                        <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--warning)' }}>{stats.interviewing}</p>
                    </div>
                    <div className="card" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05))', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                        <h3 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '8px' }}>Offers</h3>
                        <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--success)' }}>{stats.offers}</p>
                    </div>
                </div>

                {/* Controls */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
                    <div style={{ display: 'flex', gap: '16px', flex: 1 }}>
                        <div style={{ position: 'relative', flex: 1, maxWidth: '300px' }}>
                            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                placeholder="Search applications..."
                                className="input-control"
                                style={{ paddingLeft: '40px' }}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <div style={{ position: 'relative' }}>
                            <Filter size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <select
                                className="input-control"
                                style={{ paddingLeft: '40px', appearance: 'none', cursor: 'pointer' }}
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            >
                                <option value="ALL">All Status</option>
                                <option value="APPLIED">Applied</option>
                                <option value="INTERVIEWING">Interviewing</option>
                                <option value="OFFER">Offer</option>
                                <option value="REJECTED">Rejected</option>
                            </select>
                        </div>
                    </div>

                    <button onClick={() => { setEditingJob(null); setShowForm(true); }} className="btn btn-primary">
                        <Plus size={20} />
                        Add Application
                    </button>
                </div>

                {/* Grid */}
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Loading applications...</div>
                ) : filteredJobs.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px', background: 'rgba(30, 41, 59, 0.3)', borderRadius: 'var(--radius)', border: '1px dashed var(--border)' }}>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>No applications found.</p>
                        <button onClick={() => setShowForm(true)} className="btn btn-primary">Add your first application</button>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                        {filteredJobs.map(job => (
                            <JobCard key={job.id} job={job} onDelete={handleDelete} onEdit={openEdit} />
                        ))}
                    </div>
                )}
            </div>

            {showForm && (
                <JobForm
                    job={editingJob}
                    onClose={() => { setShowForm(false); setEditingJob(null); }}
                    onSubmit={editingJob ? handleUpdate : handleCreate}
                />
            )}
        </div>
    );
};

export default Dashboard;
