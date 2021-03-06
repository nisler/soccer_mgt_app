import {Component, OnDestroy, OnInit} from '@angular/core';
import { TeamService } from '../../services/team.service';
import {NavController} from '@ionic/angular';
import { CognitoService } from '../../services/cognito-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.page.html',
  styleUrls: ['./create-team.page.scss'],
})
export class CreateTeamPage implements OnInit, OnDestroy {

    team = {
      name: '',
      primary_color: '',
      session_id: null,
      alternate_color: '',
      manager_id: null
    };

  constructor(public teamService: TeamService,
              public navCtrl: NavController,
              public cognitoService: CognitoService,
              public route: ActivatedRoute) { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  ionViewWillEnter() {
    this.team = {
      name: '',
      primary_color: '',
      session_id: null,
      alternate_color: '',
      manager_id: null
    };
  }

  createTeam() {
    // TODO: Remember to not hardcode information in the future, see manager_id
    // Handle missing information routing
    const user = this.cognitoService.getUser();
    if (this.team.name == "" || this.team.primary_color == "" || this.team.alternate_color == "" || this.team.session_id == null) {
      alert("Please input information");
    } else {
      this.teamService.createTeam(this.team.name, this.team.primary_color, this.team.session_id, this.team.alternate_color, user.idToken.payload['cognito:username'])
          .subscribe(data => {
            this.navCtrl.navigateBack('/home');
          }, err => {
            console.log(err);
          });
    }
  }
}
