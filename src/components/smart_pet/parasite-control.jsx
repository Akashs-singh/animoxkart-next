'use client';
import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

// Repeat intervals in days
const INTERVALS = {
    deworming: 90,   // every 3 months
    flea_tick: 30,   // every month
};

const LABELS = {
    deworming: 'Deworming',
    flea_tick: 'Flea & Tick',
};

const ICONS = {
    deworming: 'fa-bug',
    flea_tick: 'fa-shield',
};

const TYPES = ['deworming', 'flea_tick'];

const emptyForm = (type) => ({
    type,
    last_done: new Date().toISOString().slice(0, 10),
    product_used: '',
    note: '',
});

function nextDueDate(lastDone, type) {
    const d = new Date(lastDone);
    d.setDate(d.getDate() + INTERVALS[type]);
    return d;
}

function daysUntil(date) {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return Math.round((date - now) / (1000 * 60 * 60 * 24));
}

function statusChip(days) {
    if (days < 0)  return { label: `Overdue by ${Math.abs(days)}d`, cls: 'pc-chip-overdue' };
    if (days <= 7) return { label: `Due in ${days}d`,               cls: 'pc-chip-soon' };
    return           { label: `Due in ${days}d`,                    cls: 'pc-chip-ok' };
}

class ParasiteControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            records: {},          // keyed by type: 'deworming' | 'flea_tick'
            loading: true,
            activeForm: null,     // which type's form is open, or null
            submitting: false,
            form: emptyForm('deworming'),
            error: '',
        };
    }

    componentDidMount() {
        this.fetchRecords();
    }

    authHeaders = () => ({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Cookies.get('token'),
    });

    fetchRecords = async () => {
        const { pet_id } = this.props;
        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL_NEW}/pets/${pet_id}/parasite-control`,
                { headers: this.authHeaders() }
            );
            // Index by type for easy lookup
            const records = {};
            (res.data.records || []).forEach(r => { records[r.type] = r; });
            this.setState({ records, loading: false });
        } catch {
            this.setState({ loading: false, error: 'Failed to load records.' });
        }
    };

    openForm = (type) => {
        const existing = this.state.records[type];
        this.setState({
            activeForm: type,
            error: '',
            form: {
                type,
                last_done:    existing ? String(existing.last_done).slice(0, 10) : new Date().toISOString().slice(0, 10),
                product_used: existing?.product_used || '',
                note:         existing?.note || '',
            },
        });
    };

    closeForm = () => this.setState({ activeForm: null, error: '' });

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState(prev => ({ form: { ...prev.form, [name]: value } }));
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { pet_id } = this.props;
        const { form } = this.state;
        if (!form.last_done) {
            this.setState({ error: 'Date is required.' });
            return;
        }
        this.setState({ submitting: true, error: '' });
        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL_NEW}/pets/${pet_id}/parasite-control`,
                form,
                { headers: this.authHeaders() }
            );
            await this.fetchRecords();
            this.closeForm();
        } catch {
            this.setState({ error: 'Failed to save. Please try again.' });
        } finally {
            this.setState({ submitting: false });
        }
    };

    render() {
        const { petName } = this.props;
        const { records, loading, activeForm, submitting, form, error } = this.state;

        return (
            <div className="pc-section">
                <div className="pc-header">
                    <h3><i className="fa fa-refresh"></i> Parasite Control</h3>
                </div>

                {loading && <p className="pc-msg">Loading…</p>}

                {!loading && (
                    <div className="pc-cards">
                        {TYPES.map(type => {
                            const rec = records[type];
                            const nextDue = rec ? nextDueDate(rec.last_done, type) : null;
                            const days    = nextDue ? daysUntil(nextDue) : null;
                            const chip    = days !== null ? statusChip(days) : null;

                            return (
                                <div key={type} className={`pc-card ${chip ? `pc-card-${chip.cls.replace('pc-chip-', '')}` : 'pc-card-unset'}`}>
                                    <div className="pc-card-top">
                                        <div className="pc-card-title">
                                            <i className={`fa ${ICONS[type]}`}></i>
                                            <span>{LABELS[type]}</span>
                                        </div>
                                        <button className="btn pc-edit-btn" onClick={() => this.openForm(type)}>
                                            {rec ? <i className="fa fa-pencil"></i> : '+ Set'}
                                        </button>
                                    </div>

                                    {rec ? (
                                        <div className="pc-card-body">
                                            <div className="pc-row">
                                                <span className="pc-label">Last done</span>
                                                <span className="pc-value">{String(rec.last_done).slice(0, 10)}</span>
                                            </div>
                                            <div className="pc-row">
                                                <span className="pc-label">Next due</span>
                                                <span className="pc-value">{nextDue.toISOString().slice(0, 10)}</span>
                                            </div>
                                            {rec.product_used && (
                                                <div className="pc-row">
                                                    <span className="pc-label">Product</span>
                                                    <span className="pc-value">{rec.product_used}</span>
                                                </div>
                                            )}
                                            <div className="pc-card-footer">
                                                <span className={`pc-chip ${chip.cls}`}>{chip.label}</span>
                                                <span className="pc-interval">every {INTERVALS[type]}d</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="pc-unset-msg">
                                            {`No ${LABELS[type].toLowerCase()} record yet.`}
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Bottom-sheet form */}
                {activeForm && (
                    <div className="vacc-modal-overlay" onClick={this.closeForm}>
                        <div className="vacc-modal" onClick={e => e.stopPropagation()}>
                            <div className="vacc-modal-header">
                                <h4>
                                    <i className={`fa ${ICONS[activeForm]}`}></i>
                                    &nbsp;{records[activeForm] ? 'Update' : 'Set'} {LABELS[activeForm]}
                                </h4>
                                <button className="close-button" onClick={this.closeForm}>✕</button>
                            </div>
                            <form onSubmit={this.handleSubmit} className="vacc-form">
                                <label>Last done date *</label>
                                <input
                                    type="date"
                                    name="last_done"
                                    value={form.last_done}
                                    onChange={this.handleChange}
                                    required
                                />

                                <label>Product / medicine used</label>
                                <input
                                    type="text"
                                    name="product_used"
                                    value={form.product_used}
                                    onChange={this.handleChange}
                                    placeholder={activeForm === 'deworming' ? 'e.g. Drontal, Prazitel' : 'e.g. NexGard, Bravecto'}
                                />

                                <label>Note</label>
                                <input
                                    type="text"
                                    name="note"
                                    value={form.note}
                                    onChange={this.handleChange}
                                    placeholder="Optional"
                                />

                                {/* Calculated next-due preview */}
                                {form.last_done && (
                                    <p className="pc-preview">
                                        Next due: <strong>
                                            {nextDueDate(form.last_done, activeForm).toISOString().slice(0, 10)}
                                        </strong>
                                        &nbsp;({INTERVALS[activeForm]} days from last dose)
                                    </p>
                                )}

                                {error && <p className="vacc-error">{error}</p>}

                                <button
                                    type="submit"
                                    className="btn btn-solid vacc-submit-btn"
                                    disabled={submitting}
                                >
                                    {submitting ? 'Saving…' : 'Save'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default ParasiteControl;
