import {
  Wallet,
  walletModel,
} from "@/infrastructure/persistence/mongoose/models/wallet";
import Repository from "@/shared/repository";

export class WalletRepository extends Repository<Wallet> {
  [x: string]: any;
  constructor() {
    super(walletModel);
  }
}
