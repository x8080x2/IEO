import { useParams } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { ArrowLeft, Mail, Phone, Linkedin } from "lucide-react";

const teamData = {
  "eileen-briggs": {
    name: "Eileen Briggs",
    title: "Senior Financial Advisor",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    bio: "Eileen Briggs brings over 15 years of experience in financial services and government assistance programs. She holds a Master's degree in Public Administration and has dedicated her career to helping individuals and families navigate complex financial assistance programs. Her expertise in federal funding regulations and compassionate approach to client service have made her an invaluable asset to the FESSA team.",
    experience: "15+ years",
    education: "Master's in Public Administration, Georgetown University",
    specialties: ["Federal Grant Programs", "Financial Planning", "Community Outreach", "Client Advocacy"],
    email: "eileen.briggs@fessa-us.org",
    phone: "(651) 300-9504"
  },
  "tammy-nolen": {
    name: "Tammy Nolen",
    title: "Program Coordinator",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    bio: "Tammy Nolen is an experienced program coordinator with a background in social services and community development. She has worked extensively with low-income families and understands the challenges they face in accessing financial assistance. Her role involves coordinating between various government agencies and ensuring that clients receive the support they need in a timely manner.",
    experience: "12+ years",
    education: "Bachelor's in Social Work, University of Minnesota",
    specialties: ["Program Management", "Social Services", "Community Development", "Case Management"],
    email: "tammy.nolen@fessa-us.org",
    phone: "(651) 300-9505"
  },
  "amanda-rios-heintz": {
    name: "Amanda Rios Heintz",
    title: "Community Relations Specialist",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    bio: "Amanda Rios Heintz specializes in community relations and multicultural outreach. She is fluent in both English and Spanish and has been instrumental in expanding FESSA's reach to underserved communities. Her work focuses on building partnerships with local organizations and ensuring that all community members have access to the resources they need.",
    experience: "10+ years",
    education: "Bachelor's in Communications, University of California Los Angeles",
    specialties: ["Community Outreach", "Multicultural Services", "Partnership Development", "Public Relations"],
    email: "amanda.heintz@fessa-us.org",
    phone: "(651) 300-9506"
  }
};

export default function TeamBio() {
  const params = useParams();
  const memberSlug = params.name;
  
  if (!memberSlug || !teamData[memberSlug as keyof typeof teamData]) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="text-center p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Team Member Not Found</h1>
            <p className="text-gray-600 mb-6">The team member you're looking for doesn't exist.</p>
            <Link href="/">
              <Button className="fessa-blue hover:fessa-blue-dark text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  const member = teamData[memberSlug as keyof typeof teamData];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="hover:bg-gray-50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Team
            </Button>
          </Link>
        </div>

        {/* Team Member Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Profile Image and Contact */}
          <div className="lg:col-span-1">
            <Card className="overflow-hidden">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-80 object-cover"
              />
              <CardContent className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h1>
                <Badge className="fessa-blue text-white mb-4">{member.title}</Badge>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Mail className="w-5 h-5" />
                    <span className="text-sm">{member.email}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Phone className="w-5 h-5" />
                    <span className="text-sm">{member.phone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Biography and Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Biography */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Biography</h2>
                <p className="text-gray-600 leading-relaxed">{member.bio}</p>
              </CardContent>
            </Card>

            {/* Professional Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Experience</h3>
                  <p className="text-fessa-blue font-semibold text-xl">{member.experience}</p>
                  <p className="text-gray-600 text-sm mt-1">in financial services</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Education</h3>
                  <p className="text-gray-600">{member.education}</p>
                </CardContent>
              </Card>
            </div>

            {/* Specialties */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Areas of Expertise</h3>
                <div className="grid grid-cols-2 gap-3">
                  {member.specialties.map((specialty, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-fessa-blue rounded-full"></div>
                      <span className="text-gray-600">{specialty}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Ready to get started with your application?
                </h3>
                <p className="text-gray-600 mb-4">
                  {member.name} and our team are here to help you through the process.
                </p>
                <Link href="/apply">
                  <Button className="fessa-blue hover:fessa-blue-dark text-white">
                    Start Your Application
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
