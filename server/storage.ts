import { type Application, type InsertApplication, type Contact, type InsertContact } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createApplication(application: InsertApplication): Promise<Application>;
  getApplication(id: string): Promise<Application | undefined>;
  getAllApplications(): Promise<Application[]>;
  createContactSubmission(contact: InsertContact): Promise<Contact>;
  getContactSubmission(id: string): Promise<Contact | undefined>;
  getAllContactSubmissions(): Promise<Contact[]>;
}

export class MemStorage implements IStorage {
  private applications: Map<string, Application>;
  private contacts: Map<string, Contact>;

  constructor() {
    this.applications = new Map();
    this.contacts = new Map();
  }

  async createApplication(insertApplication: InsertApplication): Promise<Application> {
    const id = randomUUID();
    const application: Application = {
      ...insertApplication,
      id,
      createdAt: new Date(),
    };
    this.applications.set(id, application);
    return application;
  }

  async getApplication(id: string): Promise<Application | undefined> {
    return this.applications.get(id);
  }

  async getAllApplications(): Promise<Application[]> {
    return Array.from(this.applications.values());
  }

  async createContactSubmission(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = {
      ...insertContact,
      id,
      createdAt: new Date(),
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContactSubmission(id: string): Promise<Contact | undefined> {
    return this.contacts.get(id);
  }

  async getAllContactSubmissions(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }
}

export const storage = new MemStorage();
