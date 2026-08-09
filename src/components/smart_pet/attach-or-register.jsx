'use client';
import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { getContactIdFromJWT } from '../common/utils/index';
import './css/pet-finder.css';

// Shown when a scanned tag_id is not yet in the system.
// Owner chooses: attach to an existing pet OR register as new.
class AttachOrRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 'choice',       // 'choice' | 'pick' | 'attaching' | 'done' | 'error'
            pets: [],
            petsLoading: false,
            selectedPetId: null,
            errorMsg: '',
        };
    }

    authHeaders = () => ({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Cookies.get('token'),
    });

    // User chose "attach to existing" — load their pets
    handleAttach = async () => {
        const contact_id = getContactIdFromJWT();
        if (!contact_id) {
            // Not logged in — send them through register flow with redirect back
            window.location.href = `/pet-finder-tag/register/${this.props.tag_id}`;
            return;
        }
        this.setState({ step: 'pick', petsLoading: true, errorMsg: '' });
        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL_NEW}/pets-by-contact/${contact_id}`,
                { headers: this.authHeaders() }
            );
            this.setState({ pets: res.data.pets || [], petsLoading: false });
        } catch {
            this.setState({ petsLoading: false, errorMsg: 'Could not load your pets. Please try again.' });
        }
    };

    // User chose "add as new pet"
    handleAddNew = () => {
        window.location.href = `/pet-finder-tag/register/${this.props.tag_id}`;
    };

    // User selected a pet from the list — do the attach
    confirmAttach = async () => {
        const { selectedPetId } = this.state;
        const { tag_id } = this.props;
        if (!selectedPetId) return;

        const contact_id = getContactIdFromJWT();
        this.setState({ step: 'attaching', errorMsg: '' });
        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL_NEW}/tags/${tag_id}/attach-pet`,
                { pet_id: selectedPetId, contact_id },
                { headers: this.authHeaders() }
            );
            this.setState({ step: 'done' });
            // Brief pause then redirect to the now-live tag view
            setTimeout(() => {
                window.location.href = `/finder-tag/${tag_id}`;
            }, 1500);
        } catch (err) {
            const msg = err?.response?.data?.message || 'Failed to attach tag. Please try again.';
            this.setState({ step: 'pick', errorMsg: msg });
        }
    };

    capitalizeFirstLetter = (str) => {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    calculateAge = (birthDate) => {
        const today = new Date();
        const dob = new Date(birthDate);
        if (isNaN(dob)) return '';
        let years = today.getFullYear() - dob.getFullYear();
        let months = today.getMonth() - dob.getMonth();
        if (months < 0 || (months === 0 && today.getDate() < dob.getDate())) { years--; months += 12; }
        if (today.getDate() < dob.getDate()) months--;
        months = (months + 12) % 12;
        const y = years  > 0 ? `${years}y`  : '';
        const m = months > 0 ? `${months}m` : '';
        return `${y} ${m}`.trim() || '< 1m';
    };

    render() {
        const { tag_id } = this.props;
        const { step, pets, petsLoading, selectedPetId, errorMsg } = this.state;

        // ── done ──────────────────────────────────────────────────────────
        if (step === 'done') {
            return (
                <div className="aor-wrap">
                    <div className="aor-done">
                        <span className="aor-done-icon">✅</span>
                        <h3>Tag linked!</h3>
                        <p>Redirecting to your pet&apos;s profile…</p>
                    </div>
                </div>
            );
        }

        // ── attaching ─────────────────────────────────────────────────────
        if (step === 'attaching') {
            return (
                <div className="aor-wrap">
                    <div className="aor-done">
                        <p>Linking tag…</p>
                    </div>
                </div>
            );
        }

        // ── pet picker ────────────────────────────────────────────────────
        if (step === 'pick') {
            return (
                <div className="aor-wrap">
                    <div className="aor-card">
                        <button className="aor-back" onClick={() => this.setState({ step: 'choice' })}>
                            ← Back
                        </button>
                        <h2 className="aor-title">Select your pet</h2>
                        <p className="aor-sub">Tag <strong>{tag_id}</strong> will be linked to the pet you choose.</p>

                        {errorMsg && <p className="aor-error">{errorMsg}</p>}

                        {petsLoading && <p className="aor-loading">Loading your pets…</p>}

                        {!petsLoading && pets.length === 0 && (
                            <p className="aor-empty">No pets found on your account. Register this tag as a new pet instead.</p>
                        )}

                        {!petsLoading && pets.length > 0 && (
                            <div className="aor-pet-list">
                                {pets.map((pet) => (
                                    <div
                                        key={pet.pet_id || pet.tag_id}
                                        className={`aor-pet-row ${selectedPetId === (pet.pet_id || pet.tag_id) ? 'aor-pet-row-selected' : ''}`}
                                        onClick={() => this.setState({ selectedPetId: pet.pet_id || pet.tag_id })}
                                    >
                                        <img
                                            src={pet.image
                                                ? `https://animoxkart-users.s3.ap-south-1.amazonaws.com/pets/${pet.image}`
                                                : `/assets/images/pets/smart-pet/${(pet.pet_type || 'dog').toLowerCase()}.png`
                                            }
                                            alt={pet.pet_name}
                                            className="aor-pet-img"
                                        />
                                        <div className="aor-pet-info">
                                            <span className="aor-pet-name">{pet.pet_name}</span>
                                            <span className="aor-pet-meta">
                                                {this.capitalizeFirstLetter(pet.pet_type)}
                                                {pet.gender ? ` · ${this.capitalizeFirstLetter(pet.gender)}` : ''}
                                                {pet.dob ? ` · ${this.calculateAge(pet.dob)}` : ''}
                                            </span>
                                        </div>
                                        <span className="aor-pet-radio">
                                            {selectedPetId === (pet.pet_id || pet.tag_id) ? '●' : '○'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {!petsLoading && (
                            <div className="aor-actions">
                                <button
                                    className="btn btn-solid aor-btn-primary"
                                    onClick={this.confirmAttach}
                                    disabled={!selectedPetId}
                                >
                                    Link tag to this pet
                                </button>
                                <button className="btn btn-outline aor-btn-outline" onClick={this.handleAddNew}>
                                    Add as new pet instead
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        // ── initial choice ────────────────────────────────────────────────
        return (
            <div className="aor-wrap">
                <div className="aor-card">
                    <div className="aor-icon">🏷️</div>
                    <h2 className="aor-title">New tag scanned</h2>
                    <p className="aor-sub">
                        Tag <strong>{tag_id}</strong> isn&apos;t linked to any pet yet.
                        <br />What would you like to do?
                    </p>

                    <div className="aor-choices">
                        <button className="aor-choice-btn" onClick={this.handleAttach}>
                            <span className="aor-choice-icon">🔗</span>
                            <div>
                                <strong>Attach to existing pet</strong>
                                <p>Old tag broke? Link this new tag to a pet already on your account.</p>
                            </div>
                        </button>

                        <button className="aor-choice-btn" onClick={this.handleAddNew}>
                            <span className="aor-choice-icon">➕</span>
                            <div>
                                <strong>Register as new pet</strong>
                                <p>First tag for this pet — fill in the full profile.</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AttachOrRegister;
