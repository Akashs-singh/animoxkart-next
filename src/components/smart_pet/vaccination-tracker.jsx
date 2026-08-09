'use client';
import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const COMMON_VACCINES = ['Rabies', 'DHPP', 'Bordetella', 'Leptospirosis', 'Canine Influenza', 'Lyme Disease'];

const emptyForm = {
    vaccine_name: '',
    date_given: '',
    vet_name: '',
    next_due: '',
};

class VaccinationTracker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vaccinations: [],
            loading: true,
            showForm: false,
            submitting: false,
            editId: null,
            form: { ...emptyForm },
            error: '',
        };
    }

    componentDidMount() {
        this.fetchVaccinations();
    }

    authHeaders = () => ({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Cookies.get('token'),
    });

    fetchVaccinations = async () => {
        const { pet_id } = this.props;
        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL_NEW}/pets/${pet_id}/vaccinations`,
                { headers: this.authHeaders() }
            );
            this.setState({ vaccinations: res.data.vaccinations || [], loading: false });
        } catch {
            this.setState({ loading: false, error: 'Failed to load vaccinations.' });
        }
    };

    openAddForm = () => {
        this.setState({ showForm: true, editId: null, form: { ...emptyForm }, error: '' });
    };

    openEditForm = (v) => {
        this.setState({
            showForm: true,
            editId: v.id,
            form: {
                vaccine_name: v.vaccine_name,
                date_given: v.date_given ? v.date_given.slice(0, 10) : '',
                vet_name: v.vet_name || '',
                next_due: v.next_due ? v.next_due.slice(0, 10) : '',
            },
            error: '',
        });
    };

    closeForm = () => {
        this.setState({ showForm: false, editId: null, form: { ...emptyForm }, error: '' });
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState(prev => ({ form: { ...prev.form, [name]: value } }));
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { pet_id } = this.props;
        const { form, editId } = this.state;
        if (!form.vaccine_name || !form.date_given || !form.next_due) {
            this.setState({ error: 'Vaccine name, date given, and next due date are required.' });
            return;
        }
        this.setState({ submitting: true, error: '' });
        try {
            if (editId) {
                await axios.put(
                    `${process.env.NEXT_PUBLIC_API_URL_NEW}/pets/${pet_id}/vaccinations/${editId}`,
                    form,
                    { headers: this.authHeaders() }
                );
            } else {
                await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL_NEW}/pets/${pet_id}/vaccinations`,
                    form,
                    { headers: this.authHeaders() }
                );
            }
            await this.fetchVaccinations();
            this.closeForm();
        } catch {
            this.setState({ error: 'Failed to save. Please try again.' });
        } finally {
            this.setState({ submitting: false });
        }
    };

    markDone = async (v) => {
        const { pet_id } = this.props;
        // Auto-advance next_due by same interval for easy re-scheduling
        const prevDue = new Date(v.next_due);
        const given = new Date(v.date_given);
        const intervalDays = Math.round((prevDue - given) / (1000 * 60 * 60 * 24));
        const newDue = new Date();
        newDue.setDate(newDue.getDate() + intervalDays);
        const newDueStr = newDue.toISOString().slice(0, 10);
        const today = new Date().toISOString().slice(0, 10);
        try {
            await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL_NEW}/pets/${pet_id}/vaccinations/${v.id}`,
                { done: 1, date_given: today, next_due: newDueStr },
                { headers: this.authHeaders() }
            );
            await this.fetchVaccinations();
        } catch {
            // silent — non-critical
        }
    };

    deleteVaccination = async (id) => {
        const { pet_id } = this.props;
        if (!window.confirm('Delete this vaccination record?')) return;
        try {
            await axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL_NEW}/pets/${pet_id}/vaccinations/${id}`,
                { headers: this.authHeaders() }
            );
            await this.fetchVaccinations();
        } catch {
            // silent
        }
    };

    daysUntil = (dateStr) => {
        const due = new Date(dateStr);
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        return Math.round((due - now) / (1000 * 60 * 60 * 24));
    };

    statusLabel = (v) => {
        if (v.done) return { label: '✓ Up to date', cls: 'vacc-status-done' };
        const days = this.daysUntil(v.next_due);
        if (days < 0) return { label: `Overdue by ${Math.abs(days)}d`, cls: 'vacc-status-overdue' };
        if (days <= 7) return { label: `Due in ${days}d`, cls: 'vacc-status-soon' };
        return { label: `Due in ${days}d`, cls: 'vacc-status-ok' };
    };

    render() {
        const { vaccinations, loading, showForm, submitting, editId, form, error } = this.state;
        return (
            <div className="vaccination-section">
                <div className="vaccination-header">
                    <h3><i className="fa fa-medkit"></i> Vaccinations</h3>
                    <button className="btn vacc-add-btn" onClick={this.openAddForm}>
                        + Add
                    </button>
                </div>

                {loading && <p className="vacc-loading">Loading…</p>}

                {!loading && vaccinations.length === 0 && (
                    <p className="vacc-empty">No vaccination records yet. Tap <strong>+ Add</strong> to start.</p>
                )}

                {!loading && vaccinations.length > 0 && (
                    <div className="vacc-list">
                        {vaccinations.map((v) => {
                            const { label, cls } = this.statusLabel(v);
                            return (
                                <div key={v.id} className="vacc-card">
                                    <div className="vacc-card-main">
                                        <div>
                                            <span className="vacc-name">{v.vaccine_name}</span>
                                            {v.vet_name && <span className="vacc-vet">Dr. {v.vet_name}</span>}
                                        </div>
                                        <span className={`vacc-status ${cls}`}>{label}</span>
                                    </div>
                                    <div className="vacc-card-dates">
                                        <span>Given: {v.date_given ? v.date_given.slice(0, 10) : '—'}</span>
                                        <span>Next due: {v.next_due ? v.next_due.slice(0, 10) : '—'}</span>
                                    </div>
                                    <div className="vacc-card-actions">
                                        {!v.done && (
                                            <button className="btn vacc-done-btn" onClick={() => this.markDone(v)}>
                                                ✓ Mark done
                                            </button>
                                        )}
                                        <button className="btn vacc-edit-btn" onClick={() => this.openEditForm(v)}>
                                            <i className="fa fa-pencil"></i>
                                        </button>
                                        <button className="btn vacc-del-btn" onClick={() => this.deleteVaccination(v.id)}>
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {showForm && (
                    <div className="vacc-modal-overlay" onClick={this.closeForm}>
                        <div className="vacc-modal" onClick={e => e.stopPropagation()}>
                            <div className="vacc-modal-header">
                                <h4>{editId ? 'Edit Vaccine' : 'Add Vaccine'}</h4>
                                <button className="close-button" onClick={this.closeForm}>✕</button>
                            </div>
                            <form onSubmit={this.handleSubmit} className="vacc-form">
                                <label>Vaccine Name *</label>
                                <input
                                    list="vacc-suggestions"
                                    name="vaccine_name"
                                    value={form.vaccine_name}
                                    onChange={this.handleChange}
                                    placeholder="e.g. Rabies, DHPP…"
                                    required
                                />
                                <datalist id="vacc-suggestions">
                                    {COMMON_VACCINES.map(v => <option key={v} value={v} />)}
                                </datalist>

                                <label>Date Given *</label>
                                <input
                                    type="date"
                                    name="date_given"
                                    value={form.date_given}
                                    onChange={this.handleChange}
                                    required
                                />

                                <label>Vet Name</label>
                                <input
                                    type="text"
                                    name="vet_name"
                                    value={form.vet_name}
                                    onChange={this.handleChange}
                                    placeholder="Optional"
                                />

                                <label>Next Due Date *</label>
                                <input
                                    type="date"
                                    name="next_due"
                                    value={form.next_due}
                                    onChange={this.handleChange}
                                    required
                                />

                                {error && <p className="vacc-error">{error}</p>}

                                <button
                                    type="submit"
                                    className="btn btn-solid vacc-submit-btn"
                                    disabled={submitting}
                                >
                                    {submitting ? 'Saving…' : editId ? 'Save Changes' : 'Add Vaccine'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default VaccinationTracker;
