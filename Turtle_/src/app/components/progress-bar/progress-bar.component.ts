import {
  AfterViewChecked,
  Component,
  Inject,
  input,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../services/theme.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ViewEncapsulation } from '@angular/core';
import { LoggerService } from '../../../assets/logger.service';
import { mono_theme_colors } from '../../../assets/global_cases';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ProgressBarComponent implements OnInit, AfterViewChecked {
  /*
  - real time based on the tasks or golas that is tied to
  - different colors
  - optional labes to indicate what eatch progress bar represent
  
  types:
  - linear (simple tasks)
  - circual or semi circual bars for visial striking 

  - hover effect to show exacct percentages for details on progress
  - clicable to drill down into more detailed view or logs

  - responsible design
  - proper ARIA roles and label for accessibility
*/
  public current_progress = 20;
  public progressClass = 'progress-blue';
  public current_style_progress_bar?: string;
  private styleSubscribtion: Subscription;
  private emojiSubscription: Subscription;
  public emojiSettings = false;

  constructor(
    private themeService: ThemeService,
    @Inject(PLATFORM_ID) private platformID: Object,
    private logger: LoggerService,
  ) {
    /*
                --- themeOfProgressBarSettings
*/
    this.styleSubscribtion = this.themeService.currentStyle.subscribe({
      next: (response) => {
        if (response == 'mono') {
          if (isPlatformBrowser(this.platformID)) {
            let initRange = document?.getElementById('range_input');

            if (initRange) {
              console.log('init_ran', initRange);
              initRange.addEventListener(
                'input',
                this.themeService.monoStyleProgressBar,
              );
              initRange.style.background =
                mono_theme_colors['background-color'];
            }
          }
        }
        this.logger.info('this.current_style (global):', response);
        if (this.current_style_progress_bar !== response) {
          // loader - change style
          this.logger.info('loaded - style is changed!', response);
        }
        this.current_style_progress_bar = response;
      },
      error: (error) => {
        this.logger.error('error occur in stylesub: ', error);
        this.current_style_progress_bar = 'blue';
      },
      complete: () => {},
    });

    /*
                --- emojiSettings
*/
    this.emojiSubscription = this.themeService.emoji_progress_bar.subscribe({
      next: (reponse) => {
        this.emojiSettings = reponse;
      },
      complete: () => {
        this.logger.info('your emoji setting is changed!', '');
      },
      error: (err) => {
        this.logger.error('error: emojiSettings', err);
      },
    });
  }
  ngAfterViewChecked(): void {}
  ngOnInit(): void {
    this.logger.error('component start!', null);
  }

  ngOnDestroy() {
    this.styleSubscribtion.unsubscribe();
  }
  updateProgress(value: number) {
    this.current_progress = value;
    if (this.current_style_progress_bar !== 'mono')
      if (document?.getElementById('range_input')) {
        let item = document?.getElementById('range_input');
        item?.addEventListener('input', this.themeService.monoStyleProgressBar);
      }
  }
}
