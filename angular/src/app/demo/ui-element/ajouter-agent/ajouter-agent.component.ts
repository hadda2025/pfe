import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AgentsService, Agent } from 'src/app/services/agents.service';

@Component({
  selector: 'app-ajouter-agent',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule],
  templateUrl: './ajouter-agent.component.html',
  styleUrls: ['./ajouter-agent.component.scss']
})
export default class AjouterAgentComponent implements OnInit {

  agentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private agentsService: AgentsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.agentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      adress: ['', Validators.required],
      cin: ['', Validators.required],
      role: ['', Validators.required],
      
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.agentForm.valid) {
      const formValue = this.agentForm.value;

      const newAgent: Agent = {
        firstName: formValue. firstName,
        lastName: formValue. lastName,
        email: formValue.email,
        phone: formValue.phone,
        adress: formValue.adress,
        cin: formValue.cin,
     
        password: formValue.password
      };

      this.agentsService.createAgent(newAgent).subscribe({
        next: (response) => {
          console.log('Agent ajouté avec succès:', response);
          this.router.navigate(['/component/liste-agent']);
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout de l\'agent:', err);
        }
      });
    } else {
      this.agentForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.router.navigate(['/component/liste-agent']);
  }
}
