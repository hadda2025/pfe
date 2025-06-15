import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AgentsService, Agent } from 'src/app/services/agents.service';


@Component({
  selector: 'app-update-agent',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ],
  templateUrl: './update-agent.component.html',
  styleUrls: ['./update-agent.component.scss']
})
export default class UpdateAgentComponent implements OnInit {
  id!: string;
  agentForm!: FormGroup;

  constructor(
    private ac: ActivatedRoute,
    private fb: FormBuilder,
    private agentsService: AgentsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.ac.snapshot.params['id'];

    this.agentForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phone: [''],
      adress: [''],
      cin: [''],
      
    });

    this.loadAgentData();
  }

  onSubmit(): void {
    if (this.agentForm.valid) {
      const formValue = this.agentForm.value;

      const updatedAgent: Agent = {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        email: formValue.email,
        phone: formValue.phone,
        cin: formValue.cin,
       
        adress: formValue.adress,
        password: 'placeholderpassword' // à adapter si besoin
      };

      this.agentsService.updateAgent(this.id, updatedAgent).subscribe({
        next: (response) => {
          console.log('Agent mis à jour avec succès :', response.data);
          this.router.navigate(['/component/liste-agent']);
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour de l’agent', error);
        }
      });
    }
  }

  private loadAgentData(): void {
    this.agentsService.getAgentById(this.id).subscribe({
      next: (response: any) => {
        const agent = response.data;

        this.agentForm.patchValue({
          firstName: agent.firstName,
          lastName: agent.lastName,
          email: agent.email,
          phone: agent.phone,
          adress: agent.adress,
          cin: agent.cin,
         
        });
      },
      error: (err) => {
        console.error("Erreur lors du chargement de l'agent", err);
      }
    });
  }
}
