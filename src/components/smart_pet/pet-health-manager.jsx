'use client';
import React, { Component } from 'react';
import { isLoggedin } from '../common/utils/index';
import VaccinationTracker from './vaccination-tracker.jsx';
import WeightTracker from './weight-tracker.jsx';
import ParasiteControl from './parasite-control.jsx';
import './css/pet-finder.css';

class PetHealthManager extends Component {
    constructor(props) {
        super(props);
        const { params } = this.props;
        isLoggedin('my-pets/', true);
        this.state = {
            pet_id: params.pet_id,
            pet_name: params.pet_name || '',
            breed: params.breed || '',
            activeTab: 'vaccinations',
        };
    }

    render() {
        const { pet_id, pet_name, breed, activeTab } = this.state;
        const tabs = [
            { key: 'vaccinations', label: 'Vaccinations', icon: 'fa-medkit' },
            { key: 'weight',       label: 'Weight',       icon: 'fa-line-chart' },
            { key: 'parasite',     label: 'Parasite',     icon: 'fa-bug' },
        ];

        return (
            <div className="phm-wrapper">
                <div className="phm-topbar">
                    <a href="/my-pets" className="phm-back">
                        <i className="fa fa-arrow-left"></i>
                    </a>
                    <div className="phm-title">
                        <h2>{pet_name || 'Pet'}</h2>
                        <span>Health Manager</span>
                    </div>
                </div>

                <div className="phm-tabs">
                    {tabs.map(t => (
                        <button
                            key={t.key}
                            className={`phm-tab ${activeTab === t.key ? 'phm-tab-active' : ''}`}
                            onClick={() => this.setState({ activeTab: t.key })}
                        >
                            <i className={`fa ${t.icon}`}></i>
                            <span>{t.label}</span>
                        </button>
                    ))}
                </div>

                <div className="phm-content">
                    {activeTab === 'vaccinations' && (
                        <VaccinationTracker pet_id={pet_id} />
                    )}
                    {activeTab === 'weight' && (
                        <WeightTracker pet_id={pet_id} breed={breed} petName={pet_name} />
                    )}
                    {activeTab === 'parasite' && (
                        <ParasiteControl pet_id={pet_id} petName={pet_name} />
                    )}
                </div>
            </div>
        );
    }
}

export default PetHealthManager;
