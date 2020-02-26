import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss']
})
export class DetailPage implements OnInit {
  currScore: number = 67;
  maxScore: number = 153;
  currQuestion: number = 1;
  numQuestion: number = 1;
  questionData = {
    topic: 'Hello Topic',
    bundle: 4,
    points: 6,
    id: 0,
    question: {
      text: 'Can you read this?',
      images: [
        { resLocation: 'assets/Pokemon-Go.png' },
        { resLocation: 'assets/Pokédex-Skin_Cheren.png' }
      ]
    },
    answer_options: [
      {
        text: 'option 1',
        images: [],
        chosen: false,
        answer: null
      },
      {
        text:
          'option 2 with image mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm',
        images: [
          { resLocation: 'assets/Pokemon-Go.png' }
          //          { resLocation: 'assets/Pokédex-Skin_Cheren.png' },
        ],
        chosen: false,
        answer: null
      }
    ]
  };

  files = [{ title: 'some pdf file' }, { title: 'rand.txt' }];

  /** config for the image slider */
  sliderConfig = {
    slidesPerView: 1.3,
    spaceBetween: 1,
    centeredSlides: true,
    zoom: true
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private alert: AlertService
  ) {}

  ngOnInit() {
    // TODO load new question

    // TODO maybe relocate this
    if (this.questionData.answer_options.length === 1) {
      this.questionData.answer_options[0].chosen = true;
    }
  }

  async addFile() {
    // TODO fill this + suitable service
    console.log('should add file');
  }

  async deleteFile(index: number) {
    // TODO fill this + suitable service
    console.log(this.files[index], index);
    this.files = this.files.filter((_, i) => i !== index);
  }

  sendAnswer() {
    // TODO send answer to backend
    // TODO is a question to answer left? route to that

    // if not, route to end screen
    this.router.navigate(['quiz', 'end']);
  }

  reportError() {
    this.alert.reportError(this.questionData.id);
  }

  logout() {
    this.authService.logout();
  }

  goHome() {
    this.alert.goHome('/results/index');
  }
}
