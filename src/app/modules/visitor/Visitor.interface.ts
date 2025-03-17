export interface IVisitor {
    ip: string;
    country: string;
    city: string;
    region: string;
    isp: string;
    browser: string;
    referrer: string;
    visitedAt?: Date;
  }
  