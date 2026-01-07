import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const JobForm = ({ job, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        company: '',
        position: '',
        status: 'APPLIED',
        location: '',
        salary: '',
        notes: ''
    });

    useEffect(() => {
        if (job) {
            setFormData({
                company: job.company,
                position: job.position,
                status: job.status,
                location: job.location || '',
                salary: job.salary || '',
                notes: job.notes || ''
            });
        }
    }, [job]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(5px)'
        }}>
            <div className="card" style={{ width: '100%', maxWidth: '500px', position: 'relative' }}>
                <button
                    onClick={onClose}
                    style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', color: 'var(--text-muted)' }}
                >
                    <X size={24} />
                </button>

                <h2 style={{ marginBottom: '24px', fontSize: '1.5rem' }}>
                    {job ? 'Edit Application' : 'New Application'}
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Company</label>
                        <input
                            type="text"
                            name="company"
                            className="input-control"
                            value={formData.company}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Position</label>
                        <input
                            type="text"
                            name="position"
                            className="input-control"
                            value={formData.position}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div className="input-group">
                            <label>Status</label>
                            <select
                                name="status"
                                className="input-control"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="APPLIED">Applied</option>
                                <option value="INTERVIEWING">Interviewing</option>
                                <option value="OFFER">Offer</option>
                                <option value="REJECTED">Rejected</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label>Location</label>
                            <input
                                type="text"
                                name="location"
                                className="input-control"
                                value={formData.location}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Salary (Optional)</label>
                        <input
                            type="text"
                            name="salary"
                            className="input-control"
                            value={formData.salary}
                            onChange={handleChange}
                            placeholder="e.g. $80k - $100k"
                        />
                    </div>

                    <div className="input-group">
                        <label>Notes</label>
                        <textarea
                            name="notes"
                            className="input-control"
                            value={formData.notes}
                            onChange={handleChange}
                            rows="3"
                        ></textarea>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                        <button type="button" onClick={onClose} className="btn btn-outline">Cancel</button>
                        <button type="submit" className="btn btn-primary">
                            {job ? 'Update Application' : 'Add Application'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JobForm;
