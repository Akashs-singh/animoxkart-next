'use client';
import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { getBreedRange, classifyWeight } from './breed-weight-ranges.js';

// ─── Pure-SVG line chart ───────────────────────────────────────────────────
// Draws weight over time with a shaded healthy-range band.
// No external chart library required.
function WeightChart({ logs, breedRange, petName }) {
    const W = 320;
    const H = 160;
    const PAD = { top: 12, right: 16, bottom: 32, left: 36 };
    const cw = W - PAD.left - PAD.right;
    const ch = H - PAD.top - PAD.bottom;

    if (!logs || logs.length === 0) return null;

    const weights = logs.map(l => parseFloat(l.weight_kg));
    const dates   = logs.map(l => new Date(l.logged_at).getTime());

    const allVals = [...weights];
    if (breedRange) { allVals.push(breedRange.min, breedRange.max); }
    const wMin = Math.max(0, Math.min(...allVals) * 0.9);
    const wMax = Math.max(...allVals) * 1.1;
    const tMin = Math.min(...dates);
    const tMax = Math.max(...dates) === tMin ? tMin + 1 : Math.max(...dates);

    const xOf = t  => PAD.left + ((t - tMin) / (tMax - tMin || 1)) * cw;
    const yOf = w  => PAD.top  + ch - ((w - wMin) / (wMax - wMin || 1)) * ch;

    const pts = logs.map(l => `${xOf(new Date(l.logged_at).getTime())},${yOf(parseFloat(l.weight_kg))}`).join(' ');

    // x-axis labels — up to 5 evenly-spaced ticks
    const tickCount = Math.min(logs.length, 5);
    const step = Math.floor((logs.length - 1) / (tickCount - 1 || 1));
    const xTicks = [];
    for (let i = 0; i < tickCount; i++) {
        const idx = Math.min(i * step, logs.length - 1);
        const d = new Date(logs[idx].logged_at);
        xTicks.push({ x: xOf(d.getTime()), label: `${d.getDate()}/${d.getMonth() + 1}` });
    }

    // y-axis labels — 4 ticks
    const yTicks = [0, 1, 2, 3].map(i => {
        const w = wMin + (i / 3) * (wMax - wMin);
        return { y: yOf(w), label: w.toFixed(1) };
    });

    return (
        <svg
            viewBox={`0 0 ${W} ${H}`}
            width="100%"
            style={{ display: 'block', overflow: 'visible' }}
            aria-label={`${petName} weight chart`}
        >
            {/* healthy range band */}
            {breedRange && (
                <rect
                    x={PAD.left}
                    y={yOf(breedRange.max)}
                    width={cw}
                    height={Math.max(0, yOf(breedRange.min) - yOf(breedRange.max))}
                    fill="#bbf7d0"
                    opacity="0.55"
                />
            )}

            {/* grid lines */}
            {yTicks.map((t, i) => (
                <line key={i} x1={PAD.left} y1={t.y} x2={PAD.left + cw} y2={t.y}
                      stroke="#e5e7eb" strokeWidth="1" />
            ))}

            {/* axes */}
            <line x1={PAD.left} y1={PAD.top} x2={PAD.left} y2={PAD.top + ch}
                  stroke="#9ca3af" strokeWidth="1" />
            <line x1={PAD.left} y1={PAD.top + ch} x2={PAD.left + cw} y2={PAD.top + ch}
                  stroke="#9ca3af" strokeWidth="1" />

            {/* y-axis labels */}
            {yTicks.map((t, i) => (
                <text key={i} x={PAD.left - 4} y={t.y + 4}
                      textAnchor="end" fontSize="9" fill="#6b7280">{t.label}</text>
            ))}

            {/* x-axis labels */}
            {xTicks.map((t, i) => (
                <text key={i} x={t.x} y={PAD.top + ch + 14}
                      textAnchor="middle" fontSize="9" fill="#6b7280">{t.label}</text>
            ))}

            {/* weight line */}
            {logs.length > 1 && (
                <polyline points={pts}
                          fill="none" stroke="#427fc1" strokeWidth="2"
                          strokeLinejoin="round" strokeLinecap="round" />
            )}

            {/* dots + tooltips */}
            {logs.map((l, i) => {
                const cx2 = xOf(new Date(l.logged_at).getTime());
                const cy2 = yOf(parseFloat(l.weight_kg));
                return (
                    <g key={i}>
                        <circle cx={cx2} cy={cy2} r="4"
                                fill="#427fc1" stroke="#fff" strokeWidth="1.5" />
                        <title>{`${l.logged_at?.slice?.(0, 10)}: ${l.weight_kg} kg`}</title>
                    </g>
                );
            })}

            {/* legend */}
            {breedRange && (
                <g>
                    <rect x={PAD.left + cw - 70} y={PAD.top} width="10" height="8" fill="#bbf7d0" opacity="0.8" />
                    <text x={PAD.left + cw - 57} y={PAD.top + 7} fontSize="8" fill="#6b7280">Healthy range</text>
                </g>
            )}
        </svg>
    );
}
// ──────────────────────────────────────────────────────────────────────────

const ALERT_TIPS = {
    underweight: 'may be underweight. Consider increasing meal portions or switching to a calorie-dense food.',
    overweight:  'may be overweight. Try reducing treats and increasing daily walks.',
};

const STORE_LINK = 'https://animoxkart.com/shop/regular';

class WeightTracker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logs: [],
            loading: true,
            showForm: false,
            submitting: false,
            form: { weight_kg: '', logged_at: new Date().toISOString().slice(0, 10), note: '' },
            error: '',
        };
    }

    componentDidMount() {
        this.fetchLogs();
    }

    authHeaders = () => ({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Cookies.get('token'),
    });

    fetchLogs = async () => {
        const { pet_id } = this.props;
        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL_NEW}/pets/${pet_id}/weight-logs`,
                { headers: this.authHeaders() }
            );
            this.setState({ logs: res.data.logs || [], loading: false });
        } catch {
            this.setState({ loading: false, error: 'Failed to load weight history.' });
        }
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState(prev => ({ form: { ...prev.form, [name]: value } }));
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { pet_id } = this.props;
        const { form } = this.state;
        const kg = parseFloat(form.weight_kg);
        if (!form.weight_kg || isNaN(kg) || kg <= 0 || !form.logged_at) {
            this.setState({ error: 'Enter a valid weight and date.' });
            return;
        }
        this.setState({ submitting: true, error: '' });
        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL_NEW}/pets/${pet_id}/weight-logs`,
                form,
                { headers: this.authHeaders() }
            );
            await this.fetchLogs();
            this.setState({
                showForm: false,
                form: { weight_kg: '', logged_at: new Date().toISOString().slice(0, 10), note: '' },
            });
        } catch {
            this.setState({ error: 'Failed to save. Please try again.' });
        } finally {
            this.setState({ submitting: false });
        }
    };

    deleteLog = async (id) => {
        const { pet_id } = this.props;
        if (!window.confirm('Delete this weight entry?')) return;
        try {
            await axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL_NEW}/pets/${pet_id}/weight-logs/${id}`,
                { headers: this.authHeaders() }
            );
            await this.fetchLogs();
        } catch {
            // silent
        }
    };

    render() {
        const { breed, petName } = this.props;
        const { logs, loading, showForm, submitting, form, error } = this.state;

        const breedRange  = getBreedRange(breed);
        const latestWeight = logs.length > 0 ? parseFloat(logs[logs.length - 1].weight_kg) : null;
        const status = latestWeight !== null ? classifyWeight(latestWeight, breed) : null;

        return (
            <div className="weight-tracker-section">
                <div className="weight-tracker-header">
                    <h3><i className="fa fa-line-chart"></i> Weight &amp; Growth</h3>
                    <button className="btn wt-add-btn" onClick={() => this.setState({ showForm: true, error: '' })}>
                        + Log
                    </button>
                </div>

                {loading && <p className="wt-msg">Loading…</p>}

                {!loading && logs.length === 0 && (
                    <p className="wt-msg">No weight entries yet. Tap <strong>+ Log</strong> to start tracking.</p>
                )}

                {/* Status alert */}
                {!loading && status && status !== 'healthy' && (
                    <div className={`wt-alert wt-alert-${status}`}>
                        <span className="wt-alert-icon">{status === 'overweight' ? '⚠️' : '⬇️'}</span>
                        <div>
                            <strong>{petName || 'Your pet'}</strong> {ALERT_TIPS[status]}
                            {status === 'overweight' && (
                                <div className="wt-store-link">
                                    <a href={STORE_LINK} target="_blank" rel="noopener noreferrer">
                                        Browse lighter food options →
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {!loading && status === 'healthy' && breedRange && (
                    <div className="wt-alert wt-alert-healthy">
                        <span className="wt-alert-icon">✅</span>
                        <span>
                            {petName || 'Your pet'} is within the healthy range ({breedRange.min}–{breedRange.max} kg).
                        </span>
                    </div>
                )}

                {/* Chart */}
                {!loading && logs.length > 0 && (
                    <div className="wt-chart-wrapper">
                        <WeightChart logs={logs} breedRange={breedRange} petName={petName} />
                    </div>
                )}

                {/* Log table */}
                {!loading && logs.length > 0 && (
                    <div className="wt-log-table">
                        {[...logs].reverse().map((l) => (
                            <div key={l.id} className="wt-log-row">
                                <div className="wt-log-main">
                                    <span className="wt-log-weight">{parseFloat(l.weight_kg).toFixed(1)} kg</span>
                                    <span className="wt-log-date">{l.logged_at ? String(l.logged_at).slice(0, 10) : ''}</span>
                                </div>
                                {l.note && <div className="wt-log-note">{l.note}</div>}
                                <button className="btn wt-del-btn" onClick={() => this.deleteLog(l.id)}>
                                    <i className="fa fa-trash"></i>
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Add log modal */}
                {showForm && (
                    <div className="vacc-modal-overlay"
                         onClick={() => this.setState({ showForm: false, error: '' })}>
                        <div className="vacc-modal"
                             onClick={e => e.stopPropagation()}>
                            <div className="vacc-modal-header">
                                <h4>Log Weight</h4>
                                <button className="close-button"
                                        onClick={() => this.setState({ showForm: false, error: '' })}>✕</button>
                            </div>
                            <form onSubmit={this.handleSubmit} className="vacc-form">
                                <label>Weight (kg) *</label>
                                <input
                                    type="number"
                                    name="weight_kg"
                                    value={form.weight_kg}
                                    onChange={this.handleChange}
                                    placeholder="e.g. 12.5"
                                    step="0.1"
                                    min="0.1"
                                    required
                                />
                                <label>Date *</label>
                                <input
                                    type="date"
                                    name="logged_at"
                                    value={form.logged_at}
                                    onChange={this.handleChange}
                                    required
                                />
                                <label>Note (optional)</label>
                                <input
                                    type="text"
                                    name="note"
                                    value={form.note}
                                    onChange={this.handleChange}
                                    placeholder="e.g. After vet visit"
                                />
                                {error && <p className="vacc-error">{error}</p>}
                                <button
                                    type="submit"
                                    className="btn btn-solid vacc-submit-btn"
                                    disabled={submitting}
                                >
                                    {submitting ? 'Saving…' : 'Save Entry'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default WeightTracker;
