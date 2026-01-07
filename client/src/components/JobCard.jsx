import { Calendar, MapPin, DollarSign, Trash2, Edit } from 'lucide-react';
import { format } from 'date-fns';

const JobCard = ({ job, onDelete, onEdit }) => {
    const getStatusClass = (status) => {
        switch (status) {
            case 'APPLIED': return 'badge-applied';
            case 'INTERVIEWING': return 'badge-interviewing';
            case 'OFFER': return 'badge-offer';
            case 'REJECTED': return 'badge-rejected';
            default: return 'badge-applied';
        }
    };

    return (
        <div className="card animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '4px' }}>{job.position}</h3>
                    <p style={{ color: 'var(--primary)', fontWeight: '500' }}>{job.company}</p>
                </div>
                <span className={`badge ${getStatusClass(job.status)}`}>{job.status}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--text-muted)', fontSize: '0.9rem', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={16} />
                    {job.location || 'Remote'}
                </div>
                {job.salary && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <DollarSign size={16} />
                        {job.salary}
                    </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Calendar size={16} />
                    Applied {format(new Date(job.dateApplied), 'MMM d, yyyy')}
                </div>
            </div>

            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button onClick={() => onEdit(job)} className="btn btn-outline" style={{ padding: '6px 12px' }}>
                    <Edit size={16} />
                </button>
                <button onClick={() => onDelete(job.id)} className="btn btn-danger" style={{ padding: '6px 12px' }}>
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
};

export default JobCard;
