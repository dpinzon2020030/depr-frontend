import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subject, Subscription } from "rxjs";
import { IAccount } from "src/app/interfaces/account.interface";
import { ISymbol } from "src/app/interfaces/exchangeRate.interface";
import { AccountsService } from "../../services/accounts/accounts.service";
import { AuthService } from "../../services/auth/auth.service";

@Component({
  selector: "fury-accounts",
  templateUrl: "./accounts.component.html",
  styleUrls: ["./accounts.component.scss"],
})
export class AccountsComponent implements OnInit, OnDestroy {
  @Output() accountSelected = new EventEmitter<IAccount>();
  @Input() refreshAccount: Subject<boolean>;
  @Input() refreshSymbol: Subject<ISymbol>;

  subs: Subscription[] = [];

  accounts: IAccount[] = [];
  account: IAccount | undefined;

  accountForm!: FormGroup;

  searchRecords = false;
  processing = false;

  symbol: ISymbol = {
    currencyCode: "",
    name: "",
    order: 0,
    rate: 1,
    conversion: 1,
  };

  constructor(
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar,
    private authService: AuthService,
    private accountsService: AccountsService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.loadAccounts();

    if (this.refreshAccount) {
      this.subs.push(
        this.refreshAccount.subscribe((v) => {
          this.loadAccount();
        })
      );
    }

    if (this.refreshSymbol) {
      this.subs.push(
        this.refreshSymbol.subscribe((v) => {
          this.symbol = v;
          this.setAccount()
        })
      );
    }
  }

  ngOnDestroy() {
    this.subs.map((s) => s.unsubscribe);
  }

  buildForm(): void {
    this.accountForm = this.formBuilder.group({
      accountControl: [null, Validators.required],
      code: [""],
      availableBalance: [0],
    });
  }

  loadAccounts() {
    this.processing = true;
    this.accountsService.getAccountsByOwner(this.authService.userId).subscribe(
      (response: any) => {
        this.accounts = response;
        if (this.accounts.length > 0) {
          this.account = this.accounts[0];
          this.accountForm.get("accountControl").setValue(this.account);
          this.setAccount();
        }

        this.processing = false;

        this.snackbar.open(`Registros cargados!`, "Bank System", {
          duration: 3000,
        });
      },
      (err) => {
        console.error(err);
      }
    );
  }

  changeAccount(event: any) {
    this.account = event;
    this.setAccount();
  }

  setAccount() {
    this.accountSelected.emit(this.account);

    const availableBalance =
      Math.round(
        (this.account.availableBalance * this.symbol.rate + Number.EPSILON) *
          100
      ) / 100;

    this.accountForm.controls["code"].setValue(this.account.code);
    this.accountForm.controls["availableBalance"].setValue(availableBalance);
  }

  loadAccount() {
    this.processing = true;
    this.accountsService.getAccount(this.account._id).subscribe(
      (response: any) => {
        this.account = response;
        this.setAccount();

        this.processing = false;

        this.snackbar.open(`Cuenta actualizada!`, "Bank System", {
          duration: 3000,
        });
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
